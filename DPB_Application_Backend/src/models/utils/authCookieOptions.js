const cookieOptions = {
    expires: new Date(Date.now() + 28 * 60 * 60 * 1000),
    httpOnly: true
}

module.exports = cookieOptions;