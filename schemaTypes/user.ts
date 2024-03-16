import {defineField, defineType} from 'sanity'
import {randomKey} from '@sanity/util/content'
import { Rule } from '@sanity/validation'
import {ArrayOfObjectsInputProps, Reference, insert, setIfMissing, useClient} from 'sanity'

export async function InterestsInput(props: ArrayOfObjectsInputProps){
    const {onChange} = props

    const client = useClient({apiVersion: `2023-04-01`})
    const query = `*[_type == "interest" && !(_id in path("drafts.**")]._id | order lower((name asc))`
      const interestIds: string[] = (await client.fetch(query)) ?? []
      const interestReferences: Reference[] = interestIds.map((interestId) => ({
        _key: randomKey(12),
        _type: `interest`,
        _ref: interestId
      }))

      // Individually "insert" items to append to the end of the array
      const interestPatches = interestReferences.map((interestReference) =>
        insert([interestReference], 'after', [-1])
      )

      // Patch the document
      onChange([setIfMissing([]), ...interestPatches])

      // To reset the array instead you'd do this:
      // onChange(set(peopleReferences))
    ,
    [onChange, client]
}
export default {
    name: 'user',
    type: 'document',
    title: 'User',
    fields: [
        {
            name: 'firstName',
            title: 'First Name',
            type: 'string',
            validation: (Rule: { required: () => any }) => Rule.required()
        },
        {
            name: 'lastName',
            title: 'Last Name',
            type: 'string',
            validation: (Rule: { required: () => any }) => Rule.required()
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule: { required: () => any }) => Rule.required().email()
        },
        {
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
            validation: (Rule: { required: () => any }) => Rule.required()
        },
        {
            name: 'password',
            title: 'Password',
            type: 'string',
            validation: (Rule: { required: () => any }) => Rule.required()
        },
        {
            name: 'image',
            title: 'Profile Picture',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'bio',
            title: 'Bio',
            type: 'text',
            description: 'A few words about yourself',
            // validation: Rule => Rule.max(500)
        },
        {
            name: 'subscriptions',
            title: 'Subscriptions',
            description: 'The topics you would like to receive updates on',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{type: 'topic'}],
                }
            ],
            options: {
                layout: 'tags',
            }
        },
        {
            name: 'interests',
            title: 'Interests',
            description: "The things you're interested in",
            components: {InterestsInput},
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{type: 'interest'}],
                }
            ],
            options: {
                layout: 'tags',
            }
        },
        {
            name: 'role',
            title: 'Role',
            type: 'string',
            readOnly: true,
            initialValue: 'user',
            validation: (Rule: { required: () => any }) => Rule.required()
        }
    ]
}