import {defineField, defineType} from 'sanity'
import { Rule } from '@sanity/validation'
import {randomKey} from '@sanity/util/content'
import {ArrayOfObjectsInputProps, Reference, insert, setIfMissing, useClient} from 'sanity'

export async function AuthorInput(props: ArrayOfObjectsInputProps){
    const {onChange} = props

    const client = useClient({apiVersion: `2023-04-01`})
    const query = `*[_type == "user" && role match "admin" && !(_id in path("drafts.**")]._id | order lower((firstName asc))`
      const authorIds: string[] = (await client.fetch(query)) ?? []
      const authorReferences: Reference[] = authorIds.map((authorId) => ({
        _key: randomKey(12),
        _type: `user`,
        _ref: authorId
      }))

      // Individually "insert" items to append to the end of the array
      const authorPatches = authorReferences.map((authorReference) =>
        insert([authorReference], 'after', [-1])
      )

      // Patch the document
      onChange([setIfMissing([]), ...authorPatches])

      // To reset the authorReferences))
    ,
    [onChange, client]
}
export default {
    name: 'event',
    type: 'document',
    title: 'Event',
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
            description: 'A description of the event',
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
            name: 'topic',
            title: 'Topic',
            type: 'string',
            description: 'The topic the event falls under',
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
            name: 'host',
            title: 'Host',
            type: 'string',
            description: 'The party organising the event',
            validation: (Rule: { required: () => any }) => Rule.required()
        },
        {
            name: 'location',
            title: 'Location',
            type: 'string',
            description: 'The particular room/court where the event is taking place',
            validation: (Rule: { required: () => any }) => Rule.required()
        },
        {
            name: 'author',
            title: 'Author',
            components: {AuthorInput},
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{type: 'user'}],
                }
            ],
            options: {
                layout: 'tags',
            },
            validation: (Rule: { required: () => any }) => Rule.required().length(1)
        }        
    ]
}