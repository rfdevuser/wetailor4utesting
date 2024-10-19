import { gql } from '@apollo/client';

export const GET_PRODUCT_BY_ID = gql`
query GetProductById($id: ID!) {
  product(id: $id, idType: SLUG) {
    id
    name
    databaseId
    shortDescription
    type
    galleryImages {
      nodes {
        sourceUrl
      }
    }
    image {
      sourceUrl
    }
    ... on SimpleProduct {
      id
      name
      price
      regularPrice
      salePrice
      crossSell(first: 5) {  # Limit cross-sell products to a reasonable number
        nodes {
          id
          name
          slug
          image {
            sourceUrl
          }
        }
      }
    }
    ... on VariableProduct {
      id
      name
      crossSell(first: 5) {  # Limit cross-sell products to a reasonable number
        nodes {
          id
          name
          slug
          image {
            sourceUrl
          }
        }
      }
      variations(first: 12) {  # Limit variations to a reasonable number
        nodes {
          id
          name
          price
          regularPrice
          salePrice
          slug
          attributes {
            nodes {
              value
            }
          }
        }
      }
    }
  }
}

 
`;

export const GET_PRODUCTS = gql`
  query GetProducts($cat: String!, $mafter: String) {
    products(first: 40, where: { supportedTypesOnly: true, category: $cat }, after: $mafter) {
      edges {
        node {
          id
          name
          image {
            sourceUrl
          }
          ... on SimpleProduct {
            price
          }
          ... on VariableProduct {
            price
            variations(first: 5) {
              nodes {
                image {
                  sourceUrl
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_FABRIC_PRODUCTS = gql`
  query GetFabricProducts($firstt: Int, $cat: String!, $mafter: String, $filter: String) {
    products(
      first: $firstt,
      where: {
        supportedTypesOnly: true,
        category: $cat,
        search: $filter  # Include the filter only if it's not null
      },
      after: $mafter
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          name
          slug
          description
          ... on SimpleProduct {
            image {
              sourceUrl
            }
            price
          }
          ... on VariableProduct {
            image {
              sourceUrl
            }
            price
          }
        }
      }
    }
  }
`;



export const GET_BLOUSE_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
  product(id: $id, idType: SLUG) {
    id
    name
    databaseId
    shortDescription
    type
    galleryImages {
      nodes {
        sourceUrl
      }
    }
    image {
      sourceUrl
    }
    ... on SimpleProduct {
      id
      name
      price
      regularPrice
      salePrice
      crossSell(first: 5) {  # Limit cross-sell products to a reasonable number
        nodes {
          id
          name
          slug
          image {
            sourceUrl
          }
        }
      }
    }
    ... on VariableProduct {
      id
      name
      crossSell(first: 5) {  # Limit cross-sell products to a reasonable number
        nodes {
          id
          name
          slug
          image {
            sourceUrl
          }
        }
      }
      variations(first: 12) {  # Limit variations to a reasonable number
        nodes {
          id
          name
          price
          regularPrice
          salePrice
          slug
          attributes {
            nodes {
              value
            }
          }
        }
      }
    }
  }
}

`;



export const GET_CUSTOMER_ADDRESSES_BY_USER_ID = gql`
  query MyQuery($userId: String!) {
    wetailor4uCustomerAddressesByUserId(userId: $userId) {
      address_title
      city
      contact_no
      door_no
      firstname
      id
      landmark
      lastname
      pincode
      postal_address1
      postal_address2
      state
      userId
    }
  }
`;


export const GET_CUSTOMER_DETAILS_BY_USER_ID = gql`
  query GetCustomerDetailsByContact($contact: String!) {
      wetailor4uUserDetailsByContact(contact: $contact) {
      id
      userID
      name
      email
      contact
      date
    }
  }
`;



export const GET_CUSTOMER_CUSTOM_PRODUCT_DETAILS_BY_CONTACT_FOR_UNPAID = gql`
query GetDataByContact($contact_no: String!) {
  getDataByContact(contact_no: $contact_no) {
    description
    id
    name
    payment_type
    price
    quantity
    size
    image_link
    pid
    token
  }
}

`;


export const GET_CUSTOMER_CUSTOM_PRODUCT_DETAILS_BY_CONTACT_FOR_PAID = gql`
query GetPaidDataByContact($contact_no: String!) {
    getPaidDataByContact(contact_no: $contact_no) {
    description
    id
    name
    payment_type
    price
    quantity
    size
    image_link
    pid
    token
  }
}

`;

export const GET_CUSTOMER_CUSTOM_PRODUCT_DETAILS_BY_CONTACT_FOR_HALFPAID = gql`
query GetHalfPaidDataByContact($contact_no: String!) {
  getHalfPaidDataByContact(contact_no: $contact_no) {
    description
    id
    name
    payment_type
    price
    quantity
    size
    image_link
    pid
    token
  }
}

`;



export const GET_FABRIC_PICKUP_DETAILS_BY_USER_ID = gql`
  query GetFabricPickupDetailsByUserID($userID: String!) {
   wetailor4uFabricPickupDetails(userID: $userID) {
      userID
      fabric_type
      fabric_colour
      fabric_quantity
      description
      image_link
      address
      pickup_date
      contact_no
      status
    }
  }
`;


export const GET_ORDER_HISTORY_DETAILS_BY_USER_ID = gql`
  query GetOrderHistoryDetailsByUserID($userID: String!) {
   getOrderHistoryByUserID(userID: $userID) {
      idPrimary
      userID
      orderID
      date_of_entry
    }
  }
`;