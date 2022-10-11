const path = require('path');
const exress = require('express');
const PORT = process.env.PORT || 3000;

const app = exress();

app.use(exress.static(path.join(__dirname, '../../dist')));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});