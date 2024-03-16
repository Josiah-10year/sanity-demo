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
            type: 'reference',
            to: [{type:'court'}],
            options: {
                layout: 'tags',
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
        {
            name: 'type',
            title: 'Type of Booking',
            description: 'Private booking are closed and only for you. Open bookings remain open until 4 persons have booked it',
            type: 'string',                   
            options: {
                list: [
                    {title: 'Open', value: 'open'},
                    {title: 'Private', value: 'private'}
                ],
                layout: 'radio'
            },
            validation: (Rule: { required: () => any }) => Rule.required()
        },
        {
            name: 'numPeople',
            title: 'Number of Persons',
            type: 'number',
            validation: (Rule: { required: () => any }) => Rule.required()
            // validation: (Rule: any)  => {Rule.required().custom((context: any) => {
            //     if (context.document.type == 'open' && context.document.numPeople > 4) {
            //         return 'Only private bookings can have more than 4 people'
            //     }                
            //     return true
            //   })}
        }
    ]
}