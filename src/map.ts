export default {
    "000": [
        {
            name: 'origin',
            start: 4,
            end: 38,
            type: 'string',
        }, {
            name: 'destination',
            start: 39,
            end: 70,
            type: 'string',
        },
        {
            name: 'date',
            start: 71,
            end: 83,
            type: 'date',
            format: 'DDMMYYhhii'
        },
        {
            name: 'id',
            start: 84,
            end: 95,
            type: 'string',
        }
    ],

    "541": [
        {
            name: 'transporter_cnpj',
            start: 4,
            end: 17,
            type: 'string',
        }, {
            name: 'transporter_name',
            start: 18,
            end: 67,
            type: 'string',
        }
    ],

    "542": [
        {
            name: 'document_cnpj',
            start: 4,
            end: 17,
            type: 'string',
        }, {
            name: 'document_series',
            start: 18,
            end: 20,
            type: 'string',
        }, {
            name: 'document_number',
            start: 21,
            end: 29,
            type: 'string',
        },
        {
            name: 'event',
            start: 30,
            end: 32,
            type: 'string',
        },
        {
            name: 'date',
            start: 33,
            end: 46,
            type: 'date',
        }
    ]
}