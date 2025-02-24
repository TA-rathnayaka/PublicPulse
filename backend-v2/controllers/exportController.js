const admin = require('firebase-admin');
const { Parser } = require('json2csv');

const exportCollectionToCSV = async (req, res) => {
    const { collectionName } = req.params;

    try {
        // Get Firestore instance
        const db = admin.firestore();
        
        // Get all documents from the specified collection
        const snapshot = await db.collection(collectionName).get();
        
        if (snapshot.empty) {
            return res.status(404).json({ message: 'No documents found in collection' });
        }

        // Convert documents to array of objects
        const data = [];
        snapshot.forEach(doc => {
            data.push({ id: doc.id, ...doc.data() });
        });

        // Convert to CSV
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(data);

        // Set headers for file download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=${collectionName}.csv`);
        
        // Send CSV file
        res.status(200).send(csv);
    } catch (error) {
        console.error('Error exporting collection:', error);
        res.status(500).json({ message: 'Failed to export collection' });
    }
};

module.exports = {
    exportCollectionToCSV
};
