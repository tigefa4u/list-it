"use strict";
const assert = require('chai').assert;
const ListIt = require("../index.js");
describe("ListIt", () => {
    describe("constructor", () => {
        it("should set the autoAlign option", () => {
            const listit = new ListIt();
            assert.equal(listit.d([
                [0,1.1,222],
                [12,12.3,111],
                [123,1.23,0],
            ]).toString(),
                "  0  1.1  222\n" +
                " 12 12.3  111\n" +
                "123  1.23   0");
        });
        describe("opt.columnWidth", ()=>{
            it("should truncate the texts with the width", ()=>{
                const listit = new ListIt({columnWidth:[3]});
                listit.d([
                    ["ABCDEFG", "OPQRSTU"],
                    ["HIJKLMN", "VWXYZ"],
                ]);
                assert.equal(listit.toString(),
                    "ABC OPQRSTU\n" +
                    "HIJ VWXYZ  ");
            });
            it("should truncate the texts even if it represents number", ()=>{
                const listit = new ListIt({columnWidth:[,3]});
                listit.d([
                    ["123456", "123456"],
                    ["123456", "123456"],
                ]);
                assert.equal(listit.toString(),
                    "123456 123\n" +
                    "123456 123");
            });
            it("should not affect when a text converted from number data which is longer than the specified length exists in column", ()=>{
                const listit = new ListIt({columnWidth:3});
                listit.d([
                    ["ABCDEFGOPQRSTU", 1.2],
                    [123.456, "VWXYZ"],
                ]);
                assert.equal(listit.toString(),
                    "ABCDEFG 1.2\n" +
                    "123.456 VWX");
            });
            it("should not affect when all the text is shorter than the specified length", ()=>{
                const listit = new ListIt({columnWidth:6});
                listit.d([
                    ["ABCDEFGOPQRSTU", 1.2],
                    [123.456, "VWXYZ"],
                ]);
                assert.equal(listit.toString(),
                    "ABCDEFG   1.2\n" +
                    "123.456 VWXYZ");
            });
        });
    });
    describe(".buffer", () => {
        it("should not set the autoAlign option", () => {
            const listit = ListIt.buffer();
            assert.equal(listit.d([
                [0,1.1,222],
                [12,12.3,111],
                [123,1.23,0],
            ]).toString(),
                "0   1.1  222\n" +
                "12  12.3 111\n" +
                "123 1.23 0  ");
        });
        it("should format an array of object", () => {
            const listit = ListIt.buffer();
            assert.equal(listit.d([
                {"A": 0, "B": 2},
                {"A": 0.1, "B": 2.34},
            ]).toString(),
                "A   B   \n" +
                "0   2   \n" +
                "0.1 2.34");
        });
    });
    describe(".setColumnWidth", ()=>{
        it("should return the instance", ()=>{
            const listit = new ListIt();
            assert.deepEqual(listit.setColumnWidth(0, 10), listit);
        });
        it("should throw the index is not a number", ()=>{
            assert.throws(()=>{
                const listit = new ListIt();
                listit.d([
                    ["ABCDEFG", "OPQRSTU"],
                    ["HIJKLMN", "VWXYZ"],
                ]).setColumnWidth("", 10);
                assert.equal(listit.toString(),
                    "ABC OPQRSTU\n" +
                    "HIJ VWXYZ  ");

            });
        });
        it("should throw the width is not a number", ()=>{
            assert.throws(()=>{
                const listit = new ListIt();
                listit.d([
                    ["ABCDEFG", "OPQRSTU"],
                    ["HIJKLMN", "VWXYZ"],
                ]).setColumnWidth(0, "");
                assert.equal(listit.toString(),
                    "ABC OPQRSTU\n" +
                    "HIJ VWXYZ  ");

            });
        });
        it("should accept null for width that remove the previous specification", ()=>{
            const listit = new ListIt();
            listit.d([
                ["ABCDEFG", "OPQRSTU"],
                ["HIJKLMN", "VWXYZ"],
            ]).setColumnWidth(0, 3);
            listit.setColumnWidth(0, null);
            assert.equal(listit.toString(),
                "ABCDEFG OPQRSTU\n" +
                "HIJKLMN VWXYZ  ");
        });
        it("should truncate the texts with the width", ()=>{
            const listit = new ListIt();
            listit.d([
                ["ABCDEFG", "OPQRSTU"],
                ["HIJKLMN", "VWXYZ"],
            ]).setColumnWidth(0, 3);
            assert.equal(listit.toString(),
                "ABC OPQRSTU\n" +
                "HIJ VWXYZ  ");
        });
        it("should truncate the texts even if it represents number", ()=>{
            const listit = new ListIt();
            listit.d([
                ["123456", "123456"],
                ["123456", "123456"],
            ]).setColumnWidth(1, 3);
            assert.equal(listit.toString(),
                "123456 123\n" +
                "123456 123");
        });
        it("should not affect when a text converted from number data which is longer than the specified length exists in column", ()=>{
            const listit = new ListIt();
            listit.d([
                ["ABCDEFGOPQRSTU", 1.2],
                [123.456, "VWXYZ"],
            ]).setColumnWidth(0, 3);
            assert.equal(listit.toString(),
                "ABCDEFG   1.2\n" +
                "123.456 VWXYZ");
        });
        it("should not affect when all the text is shorter than the specified length", ()=>{
            const listit = new ListIt();
            listit.d([
                ["ABCDEFGOPQRSTU", 1.2],
                [123.456, "VWXYZ"],
            ]).setColumnWidth(1, 6);
            assert.equal(listit.toString(),
                "ABCDEFGOPQRSTU   1.2\n" +
                "       123.456 VWXYZ");
        });
    });
    describe(".setColumnWidthAll", ()=>{
        it("should return the instance", ()=>{
            const listit = new ListIt();
            assert.deepEqual(listit.setColumnWidthAll(0, 10), listit);
        });
        it("should throw the width is not a number", ()=>{
            assert.throws(()=>{
                const listit = new ListIt();
                listit.d([
                    ["ABCDEFG", "OPQRSTU"],
                    ["HIJKLMN", "VWXYZ"],
                ]).setColumnWidthAll("");
                assert.equal(listit.toString(),
                    "ABC OPQRSTU\n" +
                    "HIJ VWXYZ  ");

            });
        });
        it("should accept null for width that remove the previous specification", ()=>{
            const listit = new ListIt();
            listit.d([
                ["ABCDEFG", "OPQRSTU"],
                ["HIJKLMN", "VWXYZ"],
            ]).setColumnWidth(0, 3);
            listit.setColumnWidthAll(null);
            assert.equal(listit.toString(),
                "ABCDEFG OPQRSTU\n" +
                "HIJKLMN VWXYZ  ");
        });
        it("should truncate the texts with the width", ()=>{
            const listit = new ListIt();
            listit.d([
                ["ABCDEFG", "OPQRSTU"],
                ["HIJKLMN", "VWXYZ"],
            ]).setColumnWidthAll([3]);
            assert.equal(listit.toString(),
                "ABC OPQRSTU\n" +
                "HIJ VWXYZ  ");
        });
        it("should truncate the texts even if it represents number", ()=>{
            const listit = new ListIt();
            listit.d([
                ["123456", "123456"],
                ["123456", "123456"],
            ]).setColumnWidthAll([undefined, 3]);
            assert.equal(listit.toString(),
                "123456 123\n" +
                "123456 123");
        });
        it("should not affect when a text converted from number data which is longer than the specified length exists in column", ()=>{
            const listit = new ListIt();
            listit.d([
                ["ABCDEFGOPQRSTU", 1.2],
                [123.456, "VWXYZ"],
            ]).setColumnWidthAll(3);
            assert.equal(listit.toString(),
                "ABCDEFG 1.2\n" +
                "123.456 VWX");
        });
        it("should not affect when all the text is shorter than the specified length", ()=>{
            const listit = new ListIt();
            listit.d([
                ["ABCDEFGOPQRSTU", 1.2],
                [123.456, "VWXYZ"],
            ]).setColumnWidthAll(6);
            assert.equal(listit.toString(),
                "ABCDEFG   1.2\n" +
                "123.456 VWXYZ");
        });
    });
});
