exports.getAllGames = async (req, res) => {
    let search = req.query.search || '';
    try{
        const url = `${process.env.RAWG_GAMES}?key=${process.env.RAWG_API_KEY}&search=${search}`
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json({
            status: "success",
            data
        })
    } catch(err){
        res.status(500).json({
            status: "failed",
            message: {
                err
            }
        })
    }
}