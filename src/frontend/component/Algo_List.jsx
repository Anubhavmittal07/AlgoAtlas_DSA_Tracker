import  bubbleImg from "../../assets/Bubble-Sort-Algorithm-930x620.png";
import insertionImg from "../../assets/Insertion.jpg";
import selectionImg from "../../assets/Selection.jpeg";
import mergeImg from "../../assets/merge.jpeg";
import quickImg from "../../assets/Quick.jpg";
import heapImg from "../../assets/Heap.jpeg";
import countingImg from "../../assets/counting_sort.jpeg";
export const sortingAlgorithms = [
    {
        id: "bubble",
        title: "Bubble Sort",
        shortDescription: "Swap adjacent elements if out of order.",
        description:
            "Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",

        timeComplexity: { best: "O(n)", avg: "O(n^2)", worst: "O(n^2)" },
        spaceComplexity: "O(1)",

        stable: true,
        inPlace: true,
        category: "Comparison",
        difficulty: "Easy",

        isFavorite: false,

        image: bubbleImg, // keep local for React

        color: "#f59e0b", // UI theme per algorithm
    },

    {
        id: "insertion",
        title: "Insertion Sort",
        shortDescription: "Insert element in correct position.",
        description:
            "Builds the final sorted array one item at a time by comparing and inserting elements into their correct position.",

        timeComplexity: { best: "O(n)", avg: "O(n^2)", worst: "O(n^2)" },
        spaceComplexity: "O(1)",

        stable: true,
        inPlace: true,
        category: "Comparison",
        difficulty: "Easy",

        isFavorite: false,
        image: insertionImg,
        color: "#10b981",
    },

    {
        id: "selection",
        title: "Selection Sort",
        shortDescription: "Select minimum and place at front.",
        description:
            "Repeatedly selects the minimum element from the unsorted portion and moves it to the sorted portion.",

        timeComplexity: { best: "O(n^2)", avg: "O(n^2)", worst: "O(n^2)" },
        spaceComplexity: "O(1)",

        stable: false,
        inPlace: true,
        category: "Comparison",
        difficulty: "Easy",

        isFavorite: false,
        image: selectionImg,
        color: "#3b82f6",
    },

    {
        id: "merge",
        title: "Merge Sort",
        shortDescription: "Divide and merge sorted halves.",
        description:
            "A divide-and-conquer algorithm that divides the array into halves, sorts them and merges them.",

        timeComplexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(n)",

        stable: true,
        inPlace: false,
        category: "Comparison",
        difficulty: "Medium",

        isFavorite: false,
        image: mergeImg,
        color: "#8b5cf6",
    },

    {
        id: "quick",
        title: "Quick Sort",
        shortDescription: "Partition using pivot.",
        description:
            "Picks a pivot element and partitions the array such that smaller elements are on the left and larger on the right.",

        timeComplexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n^2)" },
        spaceComplexity: "O(log n)",

        stable: false,
        inPlace: true,
        category: "Comparison",
        difficulty: "Medium",

        isFavorite: false,
        image: quickImg,
        color: "#ef4444",
    },

    {
        id: "counting",
        title: "Counting Sort",
        shortDescription: "Count frequency of elements.",
        description:
            "Counts occurrences of each element and reconstructs the sorted array.",

        timeComplexity: { best: "O(n + k)", avg: "O(n + k)", worst: "O(n + k)" },
        spaceComplexity: "O(k)",

        stable: true,
        inPlace: false,
        category: "Non-Comparison",
        difficulty: "Medium",

        isFavorite: false,
        image: countingImg, // placeholder, keep local for React
        color: "#14b8a6",
    },

    {
        id: "heap",
        title: "Heap Sort",
        shortDescription: "Use heap structure.",
        description:
            "Builds a heap and repeatedly extracts the maximum element.",

        timeComplexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(1)",

        stable: false,
        inPlace: true,
        category: "Comparison",
        difficulty: "Medium",

        isFavorite: false,
        image: heapImg,
        color: "#6366f1",
    }
];