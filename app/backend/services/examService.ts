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
    return db.prepare("SELECT * FROM exams").all();
  }

  export function set(name, value, id = null) {
    if (id) {
      db.prepare("UPDATE exams SET value = @value WHERE id = @id").run({
        id: id,
        value,
      });
    } else {
      db.prepare("INSERT INTO exams (name, value) VALUES (@name, @value)").run({
        name,
        value,
      });
    }
  }

  export function remove(id) {
    db.prepare("DELETE FROM exams WHERE id = @id").run({
      id: id,
    });
  }
}
