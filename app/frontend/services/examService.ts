import axios from "axios";

export module examService {
  export function get(id: number) {
    return new Promise((resolve, reject) => {
      axios
        .get("/exam/get", {
          params: { id },
        })
        .then(({ data }) => resolve(data.value))
        .catch((error) => reject(error));
    });
  }

  export function set(exam) {
    return new Promise((resolve, reject) => {
      axios
        .post("/exam/set", {
          id: exam.id || null,
          name: exam.name,
          value: exam.value,
          grade: exam.grade,
        })
        .then(({ data }) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  export function metaSet(metas) {
    return new Promise((resolve, reject) => {
      axios
        .post("/exam/meta/set", {
          metas,
        })
        .then(({ data }) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  export function getAll() {
    return new Promise((resolve, reject) => {
      axios
        .get("/exam/all")
        .then(({ data }) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  export function remove(id: number) {
    return new Promise((resolve, reject) => {
      axios
        .post("/exam/remove", {
          id: id,
        })
        .then(({ data }) => resolve(data))
        .catch((error) => reject(error));
    });
  }
}
