const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
});

app.get('/note/:id', (req, res) => {
    res.sendFile(__dirname + '/public/note.html');
})

app.post('/note', async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.send('<span> Erro inesperado</span>')
    }

    const id = crypto.randomUUID();
    await saveNotes(id, content);

    res.send(`
        
        <p>Share your note through the link

            <br>

            <span>${req.headers.origin}/note/${id}}</span>

        </p>`);


});

const PORT = 3000; app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});