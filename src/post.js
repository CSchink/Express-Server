const {MongoClient} = require('mongodb');

async function main(){
    
    const uri="mongodb+srv://dbCorey:MVDhmYhNQkp2y8T@cluster0-ymebw.mongodb.net/sottlab?retryWrites=true&w=majority"
   
    const client = new MongoClient(uri);

    try {
        const pipeline = [
            {
                '$match': {
                    'operationType': 'insert',
                }
            }
        ];


       
        await monitorHistoryLabInserts(client, 30000, pipeline);

     

    } finally {
        await client.close();
    }
}

main().catch(console.error);

function closeChangeStream(timeInMs = 60000, changeStream) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Closing the change stream");
            changeStream.close();
            resolve();
        }, timeInMs)
    })
};

async function monitorHistoryLabInserts(client, timeInMs = 60000, pipeline = []) {
    const collection = client.db("sottlab").collection("historylab2");

    const changeStream = collection.watch(pipeline);
    changeStream.on('change', (next) => {
        return next;
    });

    await closeChangeStream(timeInMs, changeStream);
}
