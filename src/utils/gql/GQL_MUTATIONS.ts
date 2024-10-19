import { gql } from "@apollo/client";

export const UPDATE_CHAT_INFO = gql`
  mutation UpdateChatInfo(
    $userID: String!,
    $name: String,
    $contact_no: String,
    $language: String
  ) {
    wetailor4uAddChatInfo(
      input: {
        userID: $userID,
        name: $name,
        contact_no: $contact_no,
        language: $language,
        clientMutationId: "test"
      }
    ) {
      clientMutationId
      responseMessage
    }
  }
`;



export const BOOK_CHAT_SLOT = gql`
  mutation BookChatSlot(
    $userId: String!,
    $contact: String!,
    $endTime: String!,
    $name: String!,
    $schedulingDate: String!,
    $startTime: String!
  ) {
    wetailor4uAddChatScheduling(
      input: {
        userId: $userId,
        contact: $contact,
        endTime: $endTime,
        name: $name,
        schedulingDate: $schedulingDate,
        startTime: $startTime,
        clientMutationId: "test1"
      }
    ) {
      clientMutationId
      responseMessage
    }
  }
`;




export const UPDATE_CUSTOMER_ADDRESS = gql`
  mutation UpdateCustomerAddress(
    $userId: String!,
    $address_title: String,
    $firstname: String,
    $lastname: String,
    $door_no: String,
    $postal_address1: String,
    $postal_address2: String,
    $landmark: String,
    $pincode: String,
    $state: String,
    $city: String,
    $contact_no: String
  ) {
    wetailor4uAddCustomerAddress(
      input: {
        userId: $userId,
        address_title: $address_title,
        firstname: $firstname,
        lastname: $lastname,
        door_no: $door_no,
        postal_address1: $postal_address1,
        postal_address2: $postal_address2,
        landmark: $landmark,
        pincode: $pincode,
        state: $state,
        city: $city,
        contact_no: $contact_no,
        clientMutationId: "test"
      }
    ) {
      clientMutationId
      responseMessage
    }
  }
`;


export const DELETE_CUSTOMER_ADDRESS_BY_ID = gql`
mutation DeleteCustomerAddressById($id: Int!) {
  wetailor4uDeleteCustomerAddress(input: {clientMutationId: "test", id: $id}) { 
    clientMutationId
    responseMessage
  }
}


`;




export const CREATEORDER = gql`
mutation mymutation($input: CustomerAddressInput!, 
  $shippingInput: CustomerAddressInput!,
  $lineItems: [LineItemInput], $isPaid:Boolean!, $paymentMethod:String!,$status:OrderStatusEnum!,$customerNotes:String!,
  $shippingLines: [ShippingLineInput]){
  createOrder(input: {clientMutationId: "01",  billing: $input, shipping: $shippingInput,
    lineItems:$lineItems,isPaid: $isPaid,paymentMethod: $paymentMethod,status: $status,customerNote: $customerNotes,
  shippingLines: $shippingLines})
              
    {
    
     orderId
    }
   
  }`


  export const ADD_USER_INFO = gql`
  mutation AddUserInfo(
    $userID: String!,
    $name: String!,
    $email: String!,
    $contact: String!
  ) {
    wetailor4uAddUserInfo(
      input: {
        wetailor4u_userID: $userID,
        wetailor4u_name: $name,
        wetailor4u_email: $email,
        wetailor4u_contact: $contact,
        clientMutationId: "test1"
      }
    ) {
      clientMutationId
      wetailor4u_responseMessage
    }
  }
`;



export const UPDATE_PRODUCT_TOKEN = gql`
mutation UpdateProductToken($id: String!, $token: Int!) {
  wetailor4uUpdateProductToken(input: {id: $id, token: $token}) { 
    responseMessage
  }
}
`;


export const UPDATE_CUSTOMER_ORDER = gql`
mutation UpdateCustomerOrder($uid: String!, $status: String!, $orderid: String!) {
  customerOrderUpdate(input: {uid: $uid, status: $status, orderid: $orderid}) { 
    responseMessage
  }
}
`;


export const UPDATE_CUSTOMER_STATUS = gql`
mutation UpdateCustomerStatus($uid: String!, $status: String!) {
  wetailor4uCustomerStatusUpdate(input: {uid: $uid, status: $status}) { 
    responseMessage
  }
}
`;


export const ADD_FABRIC_PICKUP = gql`
  mutation AddFabricPickup(
    $userID: String!,
    $fabricType: String!,
    $fabricColour: String!,
    $fabricQuantity: String!,
    $description: String!,
    $imageLink: String!,
    $address: String!,
    $pickupDate: String!,
    $contactNo: String!,
    $status: String!
  ) {
      wetailor4uFabricPickupInsert(
      input: {
        userID: $userID,
        fabric_type: $fabricType,
        fabric_colour: $fabricColour,
        fabric_quantity: $fabricQuantity,
        description: $description,
        image_link: $imageLink,
        address: $address,
        pickup_date: $pickupDate,
        contact_no: $contactNo,
        status: $status,
        clientMutationId: "test"
      }
    ) {
      clientMutationId
      responseMessage
    }
  }
`;



export const INSERT_ORDER_HISTORY = gql`
mutation InsertOrderHistory($userID: String!, $orderID: String!) {
  wetailor4uInsertOrderHistory(input: {userID: $userID, orderID: $orderID}) { 
    responseMessage
  }
}
`;
