
exports.donate = (req, res, next) => {
    try {
       res.send("Donation");
    } catch (err) {
        console.log(err)
    }
}