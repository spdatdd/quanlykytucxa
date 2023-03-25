const config = {
    app: {
        port: process.env.PORT || 3001,
    },
    db: {
        uri: process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/QuanLyKyTucXa"
    }
}
module.exports = config