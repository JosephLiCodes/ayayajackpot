export default function handler(req, res) {
    const words = ['wizzy', 'tomb'];
    const randomIndex = Math.floor(Math.random() * words.length);
    const result = 
        {
            "winner": words[randomIndex],
            "hash" : "xdddd"
        }
    res.status(200).json(result);
  }

