import { initDB } from "./initDB";

export module examService {
  // This const rapresents the connection to the database
  const db = initDB.getDB("Database.db");

  export function get(id) {
    const config = db
      .prepare("SELECT * FROM exams WHERE id = @id")
      .all({ id })[0];

    return config;
  }

  export function getAll() {
    let exams = db.prepare("SELECT * FROM exams").all();

    exams = exams.map((exam) => {
      const metas = getMetas(exam.id);

      return {
        ...exam,
        metas,
      };
    });

    return exams;
  }

  export function set(name, value, id = null) {
    if (id) {
      db.prepare("UPDATE exams SET value = @value WHERE id = @id").run({
        id: id,
        value,
      });

      return id;
    } else {
      const result = db
        .prepare("INSERT INTO exams (name, value) VALUES (@name, @value)")
        .run({
          name,
          value,
        });

      return result.lastInsertRowid;
    }
  }

  export function getMetas(id) {
    const metas = db
      .prepare("SELECT * FROM exams_meta WHERE exam_id = @id")
      .all({ id });

    console.log(id, metas);

    return metas;
  }

  export function metaSet(metas) {
    metas.forEach((meta) => {
      const { exam_id, name, value, type } = meta;

      db.prepare(
        "INSERT INTO exams_meta (exam_id, name, value, type) VALUES (@exam_id, @name, @value, @type)"
      ).run({
        exam_id,
        name,
        value,
        type,
      });
    });
  }

  export function remove(id) {
    db.prepare("DELETE FROM exams WHERE id = @id").run({
      id,
    });

    db.prepare("DELETE FROM exams_meta WHERE exam_id = @id").run({
      id,
    });
  }
}
