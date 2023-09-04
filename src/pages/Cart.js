// import { Add, Remove } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuthStore } from "./../store/store";
import Announcement from "../components/home/Announcement";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import { mobile } from "../../src/responsive";
import { url } from "../components/helper/userRequest";
import axios from "axios";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Wrapper = styled.div`
  ${"" /* margin-top: 50px; */}
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const [pay, setPay] = useState(false);
  const [secretWords, setSecretWord] = useState("");
  axios.defaults.withCredentials = true;
  // let authToken = useAuthStore((state) => {
  //   return state.auth.authToken;
  // });
  // console.log(authToken);
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("jwt")}`;
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  let isLoggedIn = useAuthStore((state) => {
    return state.auth.user;
  });

  // downwards is to keep the user LOGIN
  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios
        .get(`${url()}/api/v1/user/private_data`)
        .catch((err) => {
          setIsLoggedIn(false);
          console.log(err, err.response.data);
        });

      if (res) {
        const data = await res.data;
        // console.log(data);
        return data;
      }
    };

    sendRequest().then((data) => {
      try {
        setIsLoggedIn(true);
        setUser(data.user);
      } catch (error) {
        setIsLoggedIn(false);
      }
    });
  }, [setIsLoggedIn, setUser]);

  // console.log(isLoggedIn);
  const handleInputChange = (event) => {
    setSecretWord(event.target.value);
  };
  const submit = () => {
    if (isLoggedIn.secretWord === secretWords) {
      alert("Secret words is correct you are now allowed to make a payment.");
      setPay(false);
    } else {
      alert("Secret words is incorrect you are not allowed to make a payment.");
    }
  };

  return (
    <Container>
      <Announcement />
      <Navbar />

      {pay && (
        <div
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              height: 350,
              width: "95%",
              marginHorizontal: 50,
              borderRadius: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 20,
              backgroundColor: "white",
            }}
          >
            <div style={{ fontSize: 100 }}>
              <i class="fas fa-user-secret"></i>
            </div>
            <div
              style={{
                position: "absolute",
                right: 10,
                top: 10,
                fontSize: 30,
                color: "red",
              }}
              onClick={() => setPay(false)}
            >
              <i class="fas fa-times-circle"></i>
            </div>
            <h1>Secret Word</h1>
            <div className="input-field" style={{ maxWidth: 335 }}>
              <i class="fas fa-user-secret"></i>
              <input
                onChange={handleInputChange}
                value={secretWords}
                type="text"
                name="secretWord"
                placeholder="Enter your secret word"
                required
              />
            </div>
            <input
              onClick={submit}
              type="submit"
              className="btn"
              value="submit"
            />
          </div>
        </div>
      )}
      <Wrapper>
        <Title>YOUR BAG </Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton onClick={() => setPay(true)} type="filled">
            CHECKOUT NOW
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            <Product>
              <ProductDetail>
                <Image src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A" />
                <Details>
                  <ProductName>
                    <b>Product:</b> JESSIE THUNDER SHOES
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 93813718293
                  </ProductId>
                  <ProductColor color="black" />
                  <ProductSize>
                    <b>Size:</b> 37.5
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  {/* <Add /> */}
                  <ProductAmount>2</ProductAmount>
                  {/* <Remove /> */}
                </ProductAmountContainer>
                <ProductPrice>$ 30</ProductPrice>
              </PriceDetail>
            </Product>
            <Hr />
            <Product>
              <ProductDetail>
                <Image src="https://i.pinimg.com/originals/2d/af/f8/2daff8e0823e51dd752704a47d5b795c.png" />
                <Details>
                  <ProductName>
                    <b>Product:</b> HAKURA T-SHIRT
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 93813718293
                  </ProductId>
                  <ProductColor color="gray" />
                  <ProductSize>
                    <b>Size:</b> M
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  {/* <Add /> */}
                  <ProductAmount>1</ProductAmount>
                  {/* <Remove /> */}
                </ProductAmountContainer>
                <ProductPrice>$ 20</ProductPrice>
              </PriceDetail>
            </Product>
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ 80</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ 80</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={() => setPay(true)}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
