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