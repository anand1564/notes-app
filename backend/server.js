const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRouter');
const groupRoutes = require('./routes/groupRouter');
const subjectRoutes = require('./routes/subjectRouter');
const noteRoutes = require('./routes/notesRouter');
const cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
  }));
  

app.use("/uploads", express.static("uploads"));

mongoose.connect('mongodb+srv://admin:5w4-x9h9jJ2t%408A@cluster0.0blyw2r.mongodb.net/notes-app?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.use('/groups', groupRoutes);
app.use('/subjects', subjectRoutes);
app.use('/notes', noteRoutes);
app.use('/auth',userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});