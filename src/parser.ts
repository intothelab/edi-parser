import * as _ from 'lodash';
import * as moment from 'moment';

interface EDIParserOptions {
    dateFormat: string;
    identifierSize: 3
}

interface EDIElement {
    name: string,
    start: number,
    end: number,
    type: string,
    format ?: string,
}

interface EDIMap {
    [key: string]: EDIElement[]
}

export default class EDIParser {
    private fileMap: EDIMap;
    private options: EDIParserOptions;

    constructor(mapping: EDIMap, options: EDIParserOptions) {

        //mapping = _.sortBy(mapping, 'start');

        // Validate registers definition
        _.each(mapping, function(fields){
            var previousFieldEnd = 0;

            _.each(fields, function(field, i){
                // First field shouldn't be the register ID (which starts at 1).
                if(i == 0 && field.start != 2) {
                    //throw new Error("First fields doesn't start at position 2.");
                } else if(i != 0 && field.start != previousFieldEnd + 1) {
                    throw new Error("Invalid start of field '" + field.name + "'.");
                }

                previousFieldEnd = field.end;
            });
        });

        this.fileMap = mapping;
        this.options = options;
    }

    parse = (contents) => {

        var lines = contents.split("\n");

        var registers = {};

        _.each(lines, (line) => {
            const registerId = line.substr(0, this.options.identifierSize);
            const element = this.fileMap[registerId];

            if(element != null){
                const parsedLine = this.processLineWithMapping(line, element);

                if(!registers[registerId]){
                    registers[registerId] = [];
                }

                registers[registerId].push(parsedLine);
            }
        });

        return registers;
    };

    processLineWithMapping = (line: any, fileMapElement: any) => {
        let parsedLine = {};

        _.each(fileMapElement, (element: EDIElement) => {
            var fieldContent = line.substring(element.start - 1, element.end);

            switch(element.type){
                case 'number':
                    fieldContent = parseInt(fieldContent);
                    break;

                case 'string':
                    fieldContent = ('' + fieldContent).trim();
                    break;

                case 'date':
                    fieldContent = moment(fieldContent, element.format || this.options.dateFormat).toDate();
                    break;
            }


            parsedLine[element.name] = fieldContent;
        });

        return parsedLine;
    }

};