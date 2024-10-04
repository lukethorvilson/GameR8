exports.getSearchGames = async (req, res) => {
  let { search } = req.params || "";
  console.log(search);
  try {
    const url =
      search &&
      `${process.env.RAWG_GAMES}?key=${process.env.RAWG_API_KEY}&search=${search}`;
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: {
        err,
      },
    });
  }
};

exports.getGameById = async (req, res) => {
  let { gameId } = req.params || "";
  if (gameId === "") {
    res.status(500).json({
      status: "failed",
      message: "No game ID was presented.",
    });
    return;
  }
  const url = `${process.env.RAWG_GAMES}?key=${process.env.RAWG_API_KEY}&id=${gameId}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.send(200).json({
      status: "success",
      body: {
        data,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: {
        err,
      },
    });
  }
};
