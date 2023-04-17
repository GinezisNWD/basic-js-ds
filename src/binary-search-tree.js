const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
	constructor() {
		this._root = null;
	}

	root() {
		return this._root
	}

	add(data) {
		this._root = addData(this._root, data)
		function addData(node, data) {
			if (!node) return new Node(data)
			if (node.data === data) return node

			if (data < node.data) {
				node.left = addData(node.left, data)
			} else {
				node.right = addData(node.right, data)
			}
			return node
		}
	}


	has(data) {
		return hasData(this._root, data)
		function hasData(node, data) {
			if (!node) { return false }
			if (node.data === data) { return true }
			return data < node.data
				? hasData(node.left, data)
				: hasData(node.right, data);
		}
	}

	find(data) {
		return findData(this._root, data)
		function findData(node, data) {
			if (!node) { return null }
			if (node.data === data) { return node }
			return data < node.data
				? findData(node.left, data)
				: findData(node.right, data);
		}
	}
	// Отрефакторить если не лень

	remove(data) {
		this._root = removeNode(this._root, data)
		function removeNode(node, data) {
			if (!node) {
				return null;
			}
			if (data < node.data) {
				node.left = removeNode(node.left, data);
				return node;
			} else if (node.data < data) {
				node.right = removeNode(node.right, data);
				return node;
			} else {
				if (!node.left && !node.right) {
					return null;
				}

				if (!node.left) {
					node = node.right;
					return node;
				}
				if (!node.right) {
					node = node.left;
					return node;
				}

				let minFromRight = node.right;
				while (minFromRight.left) {
					minFromRight = minFromRight.left;
				}
				node.data = minFromRight.data;

				node.right = removeNode(node.right, minFromRight.data);
				return node;
			}
		}
	}

	min() {
		let node = this._root;
		while (node.left) {
			node = node.left;
		}
		return node.data;
	}

	max() {
		let node = this._root;
		while (node.right) {
			node = node.right;
		}
		return node.data;
	}
}

module.exports = {
	BinarySearchTree
};