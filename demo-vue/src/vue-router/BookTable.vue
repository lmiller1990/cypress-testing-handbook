<script lang="ts" setup>
import { useRouter } from "vue-router";

interface Book {
  id: string;
  name: string;
  color: string;
}

const books: Book[] = [
  { id: "1", name: "Harry Potter", color: "bg-green-400" },
  { id: "2", name: "Snow White", color: "bg-blue-400" },
  { id: "3", name: "The Grinch", color: "bg-red-400" },
];

const router = useRouter();

async function bookmark(book: Book) {
  await window.fetch("/bookmarks", {
    method: "POST",
    body: JSON.stringify({
      book_id: book.id,
    }),
  });

  router.push("/");
}
</script>

<template>
  <ul class="m-4">
    <li
      v-for="book of books"
      :key="book.id"
      :to="`/books/${book.id}`"
      :data-cy="book.name"
    >
      <button @click="bookmark(book)" class="border p-2 rounded text-sm">
        Add to Bookmarks
      </button>

      <RouterLink :to="`/books/${book.id}`">
        <div
          class="shadow-lg p-3 my-2 rounded flex items-center justify-between"
          :class="book.color"
        >
          <div>{{ book.name }}</div>
        </div>
      </RouterLink>
    </li>
  </ul>

  <RouterView />
</template>
