import {defineField, defineType} from 'sanity'

export default {
    name: 'topic',
    type: 'document',
    title: 'Topic',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule: { required: () => any }) => Rule.required()
        }
    ]
}