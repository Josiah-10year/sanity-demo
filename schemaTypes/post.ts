import {defineField, defineType} from 'sanity'
import {useClient} from 'sanity'

export default {
    name: 'post',
    type: 'document',
    title: 'Post',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: { required: () => any }) => Rule.required()            
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',            
            description: 'The main text of the post',
            validation: (Rule: { required: () => any }) => Rule.required()
        },
        {
            name: 'timestamp',
            title: 'Timestamp',
            type: 'datetime',
            initialValue: (new Date()).toISOString(),
            validation: (Rule: { required: () => any }) => Rule.required()
        },
        {
            name: 'topic',
            title: 'Topic',
            type: 'reference',
            to: [{type: 'topic'}],
            description: 'The topic the post will be posted under',
            validation: (Rule: { required: () => any }) => Rule.required()
        },
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true
                    }
                }
            ]
        },
        {
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{type: 'user'}],
            validation: (Rule: { required: () => any }) => Rule.required()
        }        
    ]
}