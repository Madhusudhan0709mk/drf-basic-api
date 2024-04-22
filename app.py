# streamlit_app.py

import streamlit as st
import requests

# Define the base URL for the DRF API
BASE_URL = "http://localhost:8000/api/products/"

# Helper functions to make API requests
def get_all_products():
    response = requests.get(BASE_URL)
    return response.json()

def create_product(product_data):
    response = requests.post(BASE_URL, json=product_data)
    return response.json()

def get_product(product_id):
    url = f"{BASE_URL}{product_id}/"
    response = requests.get(url)
    return response.json()

def update_product(product_id, product_data):
    url = f"{BASE_URL}{product_id}/"
    response = requests.put(url, json=product_data)
    return response.json()

def delete_product(product_id):
    url = f"{BASE_URL}{product_id}/"
    response = requests.delete(url)
    return response

# Streamlit app code
def main():
    st.title("Product Management App")

    # Sidebar for CRUD operations selection
    operation = st.sidebar.selectbox("Select Operation", ["Create", "Read", "Update", "Delete"])

    # Main content area
    if operation == "Create":
        st.header("Create Product")
        name = st.text_input("Name")
        description = st.text_input("desctription")
        price = st.number_input("Price")
        if st.button("Create"):
            product_data = {"name": name, "price": price,"description":description}
            response = create_product(product_data)
            st.success("Product created successfully!")
            st.write("Created Product:", response)

    elif operation == "Read":
        st.header("Read Products")
        products = get_all_products()
        if products:
            for product in products:
                st.write(product)

    elif operation == "Update":
        st.header("Update Product")
        product_id = st.text_input("Enter Product ID to update")
        if product_id:
            product = get_product(product_id)
            if product:
                name = st.text_input("Name", value=product["name"])
                price = st.number_input("Price", value=product["price"])
                description = st.text_input("description", value=product["description"])
                if st.button("Update"):
                    product_data = {"name": name, "price": price}
                    response = update_product(product_id, product_data)
                    st.success("Product updated successfully!")
                    st.write("Updated Product:", response)
            else:
                st.warning("Product not found!")

    elif operation == "Delete":
        st.header("Delete Product")
        product_id = st.text_input("Enter Product ID to delete")
        if product_id:
            if st.button("Delete"):
                response = delete_product(product_id)
                if response.status_code == 204:
                    st.success("Product deleted successfully!")
                else:
                    st.error("Failed to delete product. Product not found or error occurred.")

if __name__ == "__main__":
    main()
