const errorHandler = (error, req, res, next) => {
    switch (error.message) {
        case "user-not-found":
            res.status(404).json({ message: error.message });
            break;
        case "email-already-in-use":
            res.status(400).json({ message: error.message });
            break;
        case "email-or-password-not-incorrect":
            res.status(400).json({ message: error.message });
            break;
        case "token-not-valid":
            res.status(403).json({ message: error.message });
            break;
        case "jwt expired":
            res.status(403).json({ message: error.message });
            break;
        default:
            res.status(500).json({ message: error.message });
            break;
    }
}

module.exports = errorHandler;