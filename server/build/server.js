import express from 'express';
const app = express();
app.get('/', (request, response) => {
    return response.json([{ message: 'Heeeey' }]);
});
app.listen(3333, () => {
    console.log(`🔥 Server is running on 3333`);
});
