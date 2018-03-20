"use strict";

const Student = require('../entity/student');

let studentService = {

    /**
     *
     * @param id
     * @returns {Promise<Model>}
     */
    get: async (id) => {
        let student = await Student.findById(id);
        return student;
    },

    /**
     *
     * @returns {Promise<Array<Model>>}
     */
    getAll: async () => {
        let students = await Student.findAll();
        return students;
    },

    /**
     *
     * @param student
     * @returns {Promise<void>}
     */
    add: async (student) => {
        let newStudent = await Student.create(student);
        return newStudent;
    },

    /**
     *
     * @param id
     * @param updatedParams
     * @returns {Promise<*>}
     */
    update: async (id, updatedParams) => {
        let student = await Student.findById(id);
        if (student) {
            for (let key in updatedParams) {
                if (updatedParams.hasOwnProperty(key)) {
                    student[key] = updatedParams[key];
                }
            }
            let newStudent = await student.save();
            return newStudent;
        } else {
            return null;
        }
    },

    /**
     *
     * @param id
     * @returns {Promise<void>}
     */
    delete: async (id) => {
        let student = await Student.findById(id);
        await student.destroy();
    }
};

module.exports = studentService;