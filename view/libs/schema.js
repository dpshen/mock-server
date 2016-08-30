import {Schema, arrayOf, normalize} from 'normalizr'

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr

// GitHub's API may return results with uppercase letters while the query
// doesn't contain any. For example, "someuser" could result in "SomeUser"
// leading to a frozen UI as it wouldn't find "someuser" in the entities.
// That's why we're forcing lower cases down there.

const group = new Schema('groups', {
    idAttribute: group => group._id.toLowerCase()
})

const api = new Schema('apis', {
    idAttribute: api => api._id.toLowerCase()
})

group.define({
    apiList: arrayOf(api)
})

// Schemas for Github API responses.
export const Schemas = {
    GROUP: group,
    GROUP_ARRAY: arrayOf(group),
    API: api,
    API_ARRAY: arrayOf(api)
}

