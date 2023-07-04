import { examService } from "../services/examService";

// All config related calls end up here
export module examController {
  export function getAll(req, res) {
    const exams = examService.getAll();

    res.status(200).json(exams);
  }

  export function get(req, res) {
    const { id } = req.query;

    res.status(200).json(examService.get(id));
  }

  export function set(req, res) {
    const { name, value, id } = req.body;

    if (!id) examService.set(name, value);
    else examService.set(name, value, id);
    res.status(200).json({ message: "Exam saved" });
  }

  export function remove(req, res) {
    const { id } = req.body;

    examService.remove(id);

    res.status(200);
  }
}
