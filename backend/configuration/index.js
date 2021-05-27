const config = {
    default: {
        database: {
            url : "mongodb+srv://jitu6220:zXn2uau3AEJ7xwrN@cluster0.fovqh.mongodb.net/test"
        }
    },
    test: {
        database: {
            url: ""
        }
    },
    production: {
        database: {
            url: ""
        }
    }
}

exports.get = function get(env) {
    return config[env] || config.default
}
