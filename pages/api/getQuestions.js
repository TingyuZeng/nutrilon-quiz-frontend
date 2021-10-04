import axios from "axios";
import hashCode from "../../lib/hashCode";

export default function handler(req, res) {
  if (req.method !== "GET")
    return res.status(400).json({ message: "invalid method" });

  const { level } = req.query;
  const index = parseInt(level);
  console.log(index);

  if (!level || isNaN(index) || index < 0 || index > 3)
    return res.status(400).json({ message: "invalid level" });

  console.log(`${process.env.BACKEND}/level-${index + 1}`);

  (async () => {
    try {
      const { data } = await axios.get(
        `${process.env.BACKEND}/level-${index + 1}`
      );

      // encrypt the answers
      const newQuestions = data.questions.map((question) => {
        const temp = JSON.parse(JSON.stringify(question));
        const answers = {
          answerA: temp.answerA,
          answerB: temp.answerB,
          answerC: temp.answerC,
          answerD: temp.answerD,
        };

        for (const key in answers) {
          if (answers[key].isCorrect)
            temp.correctAnswer = hashCode(answers[key].answer);
          answers[key] = answers[key].answer;
        }

        return { ...temp, ...answers };
      });

      res.status(200).json({ ...data, questions: newQuestions });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
      return;
    }
  })();
}
