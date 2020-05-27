

function checkvalue(number, row, column, result_array) {
    for (var j = 0; j < 9; j++) {
        // j = 0, row = 0; column = 1
        // j = 1, row = 0; column = 2
        // j = 2 row = 0; column = 3
        // j = 3 row = 0; column = 4

        var get_index = ((Math.floor(row / 3) * 3) + Math.floor(j / 3) * 9) + (Math.floor(column / 3) * 3 + (j % 3));

        // check if this value fits here
        // check it shouldn't be in row >>>  example: // 0 * 9 + 1  // 0 * 9 + 2

        // check it shouldn't be in column in same line >>> example: // 1 + (0 * 9) // 2 + (1 * 9)
        if (
            number == result_array[(row * 9) + j] ||
            number == result_array[column + (j * 9)] ||
            number == result_array[get_index]
        ) {
            return false;
        }
    }

    return true;
}



function getValue(index, result_array) {
    // If it crosses 81 (i.e) maximum limit
    // console.log(index, "index");
    // console.log(result_array, "REsult arry");
    // console.log(result_array[index], "Get value from index");
    const arrLength = result_array.length;

    if (index >= arrLength) {
        return true;
    }

    // If that index already occupies a value then no need to find number for that index
    else if (result_array[index]) {
        // Find value for next index
        return getValue(index + 1, result_array);
    }


    for (var i = 0; i < 9; i++) {
        // get the row number (i.e) for every for loop, row will be same. Math.floor will maintian it same
        // example: 0 / 9; 1 / 9; 2 / 9
        const rowNumber = Math.floor(index / 9);

        // get the column number (i.e) for every for loop, column will be incremented by 1
        // example: 0 % 9; 1 % 9
        const columnNumber = index % 9;

        if (checkvalue(i, rowNumber, columnNumber, result_array)) {
            result_array[index] = i;
            console.log(getValue(index + 1, result_array).success);
            if (getValue(index + 1, result_array).success) {
                return { success: true, result: result_array };
            }

        }
    }
    result_array[index] = 0;
    return { success: false, result: result_array };

}


function execute(puzzle) {
    if (puzzle.length !== 81) {
        return 'Invalid sudoku'
    }

    const result = getValue(0, puzzle);
    console.log(result);
}



module.exports.execute = execute;
