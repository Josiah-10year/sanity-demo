import {defineField, defineType} from 'sanity'

export default {
    name: 'booking',
    type: 'document',
    title: 'Court Booking',
    fields: [
        {
            name: 'user',
            title: 'Member',
            type: 'reference',
            to: [{type: 'user'}],
            validation: (Rule: { required: () => any }) => Rule.required()
        },
        {
            name: 'court',
            title: 'Court',
            type: 'string',
            options: {
                list: [
                    {title: 'A', value: 'a'},
                    {title: 'B', value: 'b'},
                    {title: 'C', value: 'c'}
                ]
            },
            validation: (Rule: { required: () => any }) => Rule.required()
        },
        {
            name: 'start',
            title: 'Start',
            type: 'datetime',
            initialValue: (new Date()).toISOString(),
            validation: (Rule: { required: () => any }) => Rule.required()
        },
        {
            name: 'end',
            title: 'End',
            type: 'datetime',
            initialValue: (new Date()).toISOString(),
            validation: (Rule: { required: () => any }) => Rule.required()
        },
        
    ]
}