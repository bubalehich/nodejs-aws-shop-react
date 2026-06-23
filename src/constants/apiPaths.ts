const BFF = "http://bubalehich-bff-api-bffp.us-east-1.elasticbeanstalk.com";

const API_PATHS = {
  // Routed through BFF (Task 10): Product Service and Cart Service only.
  product: `${BFF}/product`,
  cart: `${BFF}/cart`,
  order: `${BFF}/cart/profile/cart`,
  bff: BFF,
  // Import Service is reached directly: BFF intentionally does not proxy it
  // (the task says BFF should only proxy Product Service and Cart Service).
  import: "https://s6ftvfd0jc.execute-api.us-east-1.amazonaws.com/prod",
};

export default API_PATHS;
