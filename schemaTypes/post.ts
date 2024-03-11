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
            type: 'string',
            description: 'The topic the post will be posted under',
            options: {
                list: [
                    {title: 'General Discussion', value: 'general'},
                    {title: 'Everything Tennis', value: 'tennis'},
                    {title: 'Hobbies & Lifestyle', value: 'lifestyle'},
                    {title: 'Entertainment', value: 'entertainment'},
                    {title: 'Wellness', value: 'wellness'},
                    {title: 'Technology', value: 'tech'},
                    {title: 'Off-Topic', value: 'offtopic'}
                ]
            },
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