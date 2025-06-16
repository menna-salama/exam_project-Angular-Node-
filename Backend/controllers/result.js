const Result = require('../models/ResultAdmin');

exports.getAllResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate('student', 'username email')
      .populate('exam', 'title');
    
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching results', error });
  }
};
