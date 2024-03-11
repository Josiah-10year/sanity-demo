import {defineField, defineType} from 'sanity'

export default {
    name: 'interest',
    type: 'document',
    title: 'Interest',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule: { required: () => any }) => Rule.required()
        }
    ]
}