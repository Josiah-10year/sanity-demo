import {defineField, defineType} from 'sanity'

export default {
    name: 'comment',
    type: 'document',
    title: 'Comment',
    fields: [
        {
            name: 'user',
            title: 'Member',
            type: 'reference',
            to: [{type: 'user'}],
            validation: (Rule: { required: () => any }) => Rule.required()
        },
        {
            name: 'post',
            title: 'Post',
            type: 'reference',
            to: [{type: 'post'}],
            validation: (Rule: { required: () => any }) => Rule.required()
        },
        {
            name: 'text',
            title: 'Comment',
            type: 'text',
            validation: (Rule: { required: () => any }) => Rule.required()
        },
        
    ]
}