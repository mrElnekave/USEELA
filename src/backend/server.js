require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const ExifReader = require('exifreader');

const app = express();

const gameRoutes = require('./routes/game_info');
const dummyRoutes = require('./routes/dummy');

const Quiz = require('./models/Quiz'); // 替换为您的 Quiz 模型的正确路径

// 使用内存存储，以便 ExifReader 可以访问文件 buffer
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.get('/', (req, res) => {
    res.json({ mssg: 'Hello World' });
});

app.use('/api/game_info', gameRoutes);
app.use('/api/dummy', dummyRoutes);

// 提取 GPS 数据的函数
function extractGPSData(exifData) {
    if (!exifData) return null;

    const latitude = exifData.GPSLatitude ? exifData.GPSLatitude.description : null;
    const longitude = exifData.GPSLongitude ? exifData.GPSLongitude.description : null;
    const altitude = exifData.GPSAltitude ? exifData.GPSAltitude.description : null;

    return { latitude, longitude, altitude };
}

// 添加图片上传路由
app.post('/upload', upload.array('photos'), async (req, res) => {
    try {
        console.log(req.files);
        const { name, description } = req.body;
        const actual_locations = [];
        const imageBuffers = [];

        for (const file of req.files) {
            let exifData;
            try {
                exifData = ExifReader.load(file.buffer);
            } catch (error) {
                console.error('Error extracting EXIF data:', error);
            }

            const GpsData = extractGPSData(exifData);
            actual_locations.push(GpsData);
            console.log(GpsData);

            // 将文件的 buffer 添加到数组中
            imageBuffers.push(file.buffer);
        }

        const newQuiz = new Quiz({
            name: name,
            description: description,
            images: imageBuffers, // 存储图片的 buffer 而不是路径
            actual_locations: actual_locations
        });

        await newQuiz.save();
        res.status(200).json({ message: "Quiz uploaded successfully", quiz: newQuiz });
    } catch (error) {
        console.error("Error uploading quiz:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT);
});

// 连接到 MongoDB
if (process.env.BACKEND_PERSON == "true") {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.log(err));
}
