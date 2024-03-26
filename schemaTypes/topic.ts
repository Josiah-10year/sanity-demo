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
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                slugify: (input: string) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
            },
            validation: (Rule: { required: () => any }) => Rule.required() 
        }
    ]
}