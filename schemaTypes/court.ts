import {defineField, defineType} from 'sanity'

export default {
    name: 'court',
    type: 'document',
    title: 'Court',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule: { required: () => any }) => Rule.required()
        }
    ]
}