const Table = require('../models/table')
const Counter = require('../models/counter');
const User = require('../models/user')


const deck = ['2c', '2d', '2h', '2s', '3c', '3d', '3h', '3s', '4c', '4d', '4h', '4s',
    '5c', '5d', '5h', '5s', '6c', '6d', '6h', '6s', '7c', '7d', '7h', '7s', '8c', '8d',
    '8h', '8s', '9c', '9d', '9h', '9s', 'Tc', 'Td', 'Th', 'Ts', 'Jc', 'Jd', 'Jh', 'Js',
    'Qc', 'Qd', 'Qh', 'Qs', 'Kc', 'Kd', 'Kh', 'Ks', 'Ac', 'Ad', 'Ah', 'As']

const shuffle = (array) => {
    let currentIndex = array.length;

    while (currentIndex != 0) {

        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array
}


class tableController {
    async createTable(req, res) {
        try {
            let tableCounter = await Counter.findOne({ id: 'tableId' });
            if (!tableCounter) {
                tableCounter = await Counter.create({ id: 'tableId', seq: 1 });
            }

            const { blind, ante } = req.body;

            tableCounter = await Counter.findOneAndUpdate(
                { id: 'tableId' },
                { $inc: { seq: 1 } },
                { new: true }
            );

            if (!tableCounter || !tableCounter.seq) {
                return res.status(500).json({ error: 'Failed to retrieve or initialize table counter' });
            }

            const newTable = new Table({
                tableId: tableCounter.seq,
                blind,
                ante,
                pot:0
            });

            await newTable.save();
            res.status(201).json({ message: 'Table created', table: newTable });
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Failed to create table' });
        }
    }
    async getAllTables(req, res) {
        try {
            const tables = await Table.find().select('blind ante tableId currentPlayers');
            res.json(tables);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Failed to retrieve tables' });
        }
    }
    async delAllTables(req, res) {
        try {
            const tables = await Table.deleteMany();
            res.json(tables);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Failed to retrieve tables' });
        }
    }
    async getTableById(req, res) {
        try {
            const { tableId } = req.params;

            const table = await Table.findOne({ tableId: tableId })
            if (!table) {
                return res.status(404).json({ message: 'Table not found' });
            }
            res.json(table);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Failed to get table' });
        }
    }
    async joinTable(req, res) {
        try {
            const { tableId, userId } = req.body

            const table = await Table.findOne({ tableId: tableId })
            if (!table) {
                return res.status(404).json({ message: 'Table not found' });
            }

            const user = await User.findOne({ id: userId })
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (table.currentPlayers.includes(user.nickname)) {
                return res.status(400).json({ message: 'User already at the table' });
            }

            if (table.currentPlayers.length < 6) {
                table.currentPlayers.push(user.nickname)
                user.currentTables.push(table.tableId)
                await user.save()
                await table.save()
            }
            else return res.status(400).json({message:"Table is full already"})

            res.status(200).json(table)

        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Failed to join the table' });
        }
    }
    async leaveTable(req, res) {
        try {
            const { tableId, userId } = req.body

            const table = await Table.findOne({ tableId: tableId })
            if (!table) {
                return res.status(404).json({ message: 'Table not found' });
            }

            const user = await User.findOne({ id: userId })
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (!table.currentPlayers.includes(user.nickname)) {
                return res.status(404).json({ message: "No such player at the table" })
            }
            table.currentPlayers = table.currentPlayers.filter((player) => player !== user.nickname)

            user.currentTables = user.currentTables.filter((tables) => tables !== table.tableId)

            const nickname=user.nickname
            table.playerHands[nickname]=[]
            table.markModified('playerHands')
            await user.save()
            await table.save()

            res.status(200).json(table)
        } catch (e) {
            console.log(e);
        }
    }
    async startGame(req, res) {
        try {
            const { tableId } = req.params;

            const table = await Table.findOne({ tableId: tableId })
            if (!table) {
                return res.status(404).json({ message: 'Table not found' });
            }

            table.deck = shuffle(deck);
            table.flop = []
            table.turn = []
            table.river = []
            table.playerHands = {};

            table.currentPlayers.forEach(player => {
                table.playerHands[player] = [];

                for (let i = 0; i < 2; i++) {
                    const card = table.deck.shift();
                    table.playerHands[player].push(card);
                }
            });

            table.gameStarted = true;

            await table.save();
            res.status(200).json(table);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Failed to start game at table' });
        }
    }
    async sharedCardsDeal(req, res) {
        try {
            const { tableId } = req.params;

            const table = await Table.findOne({ tableId: tableId });
            if (!table) {
                return res.status(404).json({ message: 'Table not found' });
            }
            switch (true) {
                case (table.flop.length === 0):
                    for (let i = 0; i < 3; i++) {
                        const card = table.deck.shift();
                        table.flop.push(card);
                    }
                    break;
                case (table.turn.length === 0):
                    const turnCard = table.deck.shift();
                    table.turn.push(turnCard);
                    break;
                case (table.river.length === 0):
                    const riverCard = table.deck.shift();
                    table.river.push(riverCard);
                    break;
                default:
                    return res.status(400).json({ message: 'all cards have been dealt' })
            }
            await table.save()
            res.status(200).json(table)
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Failed to deal shared cards' });
        }
    }
    async placeBet(req, res) {
        try {
            const { tableId, userId,betAmmount } = req.body
            const table = await Table.findOne({ tableId: tableId })
            if (!table) {
                return res.status(404).json({ message: 'Table not found' });
            }

            const user = await User.findOne({ id: userId })
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (!table.currentPlayers.includes(user.nickname)) {
                return res.status(404).json({ message: "No such player at the table" })
            }
            table.pot+=betAmmount
            user.balance-=betAmmount
            await table.save()
            await user.save()
            res.status(200).json(table)

        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Failed to placeBet' });
        }
    }
    async shipWinnings(req,res){
        try {
            const { tableId, userId} = req.body
            const table = await Table.findOne({ tableId: tableId })
            if (!table) {
                return res.status(404).json({ message: 'Table not found' });
            }

            const user = await User.findOne({ id: userId })
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (!table.currentPlayers.includes(user.nickname)) {
                return res.status(404).json({ message: "No such player at the table" })
            }
            user.balance+=table.pot
            table.pot=0
            await table.save()
            await user.save()
            res.status(200).json(table)
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Failed to ship money' })
        }
    }
    async fold (req,res){
        try {
            const { tableId, userId} = req.body
            const table = await Table.findOne({ tableId: tableId })
            if (!table) {
                return res.status(404).json({ message: 'Table not found' });
            }

            const user = await User.findOne({ id: userId })
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (!table.currentPlayers.includes(user.nickname)) {
                return res.status(404).json({ message: "No such player at the table" })
            }
            const nickname=user.nickname
            table.playerHands[nickname]=[]
            table.markModified('playerHands')
            await table.save()
            res.status(200).json(table)
        } catch (e) {
            console.log(e);
            res.status(400).json({message:"Failed to fold"})
        }
    }
}

module.exports = new tableController()