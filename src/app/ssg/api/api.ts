import {
  Cart,
  Comment,
  Post,
  Product,
  Quote,
  Recipe,
  Todo,
  User,
} from "@/types/types";

export async function fetchCarts(): Promise<Cart[]> {
  const response = await fetch("https://dummyjson.com/carts", {
    cache: "force-cache",
  });

  const data = await response.json();
  return data.carts;
}

export async function fetchCart(id: string): Promise<Cart> {
  const response = await fetch(`https://dummyjson.com/cart/${id}`, {
    cache: "force-cache",
  });
  const data = await response.json();
  return data;
}

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("https://dummyjson.com/posts", {
    cache: "force-cache",
  });

  const data = await response.json();
  return data.posts;
}

export async function fetchPost(id: string): Promise<Post> {
  const response = await fetch(`https://dummyjson.com/posts/${id}`, {
    cache: "force-cache",
  });
  const data = await response.json();
  return data;
}

export async function fetchComments(id: string): Promise<Comment[]> {
  const response = await fetch(`https://dummyjson.com/posts/${id}/comments`, {
    cache: "force-cache",
  });
  const data = await response.json();

  const comments = await data.comments.map(
    async (comment: Comment, index: number) => {
      const response = await fetch(
        `https://dummyjson.com/users/${comment.user.id}`,
        {
          cache: "force-cache",
        }
      );

      comment.user = await response.json();

      return comment;
    }
  );
  await Promise.all(comments);

  return data.comments;
}

export async function fetchUser(id: number | string): Promise<User> {
  const response = await fetch(`https://dummyjson.com/users/${id}`, {
    cache: "force-cache",
  });
  const data = await response.json();
  return data;
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("https://dummyjson.com/products", {
    cache: "force-cache",
  });

  const data = await response.json();
  return data.products;
}

export async function fetchProduct(id: string | number): Promise<Product> {
  const response = await fetch(`https://dummyjson.com/products/${id}`, {
    cache: "force-cache",
  });
  const data = await response.json();
  return data;
}

export async function fetchQuotes(): Promise<Quote[]> {
  const response = await fetch("https://dummyjson.com/quotes", {
    cache: "force-cache",
  });

  const data = await response.json();
  return data.quotes;
}

export async function fetchRecipes(): Promise<Recipe[]> {
  const response = await fetch("https://dummyjson.com/recipes", {
    cache: "force-cache",
  });

  const data = await response.json();
  const recipes = data.recipes.filter((recipe: Recipe, index: number) => {
    if (index !== 26) {
      return recipe;
    }
  });
  return recipes;
}

export async function fetchRecipe(id: string): Promise<Recipe> {
  const response = await fetch(`https://dummyjson.com/recipes/${id}`, {
    cache: "force-cache",
  });
  const data = await response.json();
  return data;
}

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch("https://dummyjson.com/todos", {
    cache: "force-cache",
  });
  const data = await response.json();
  return data.todos;
}

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch("https://dummyjson.com/users", {
    cache: "force-cache",
  });

  const data = await response.json();
  return data.users;
}
