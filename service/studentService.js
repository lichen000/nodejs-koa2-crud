"use strict";

const Student = require('../entity/student');
const MyPage = require('../common/dto/myPage');
// const createError = require('http-errors');

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
     * @param page
     * @param size
     * @returns {Promise<MyPage>}
     */
    getAll: async (page, size) => {
        let myPage = new MyPage();
        myPage.page = page;
        myPage.size = size;
        let count = await Student.count();
        myPage.totalElements = count;
        if (count > 0) {
            let offset = page * size;
            let options = {
                limit: size,
                offset: offset
            };
            let students = await Student.findAll(options);
            myPage.totalPages = parseInt((myPage.totalElements - 1) / size) + 1;
            myPage.content = students;
        }
        return myPage;
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
     * @param student
     * @param updatedParams
     * @returns {Promise<*>}
     */
    update: async (student, updatedParams) => {
        for (let key in updatedParams) {
            if (updatedParams.hasOwnProperty(key)) {
                student[key] = updatedParams[key];
            }
        }
        let newStudent = await student.save();
        return newStudent;
    },

    /**
     *
     * @param id
     * @returns {Promise<void>}
     */
    del: async (id) => {
        let options = {
            where: {
                id: id
            }
        };
        await Student.destroy(options);
    }
};

module.exports = studentService;