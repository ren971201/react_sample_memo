import { createStore } from 'redux';

// 初期のデータ
const initData = {
    data:[],// メモのデータ
    message:'please type message:',// 表示するメッセージ
    mode:'default',// 行った操作内容
    fdata:[]// 検索結果のデータ
};

// レデューサー
// 元のstateと操作内容を引数に
// 指定されたモードの処理結果を返す
export function memoReducer(state = initData, action) {
    switch (action.type) {
        case 'ADD':
            return addReduce(state, action);

        case 'DELETE':
            return deleteReduce(state, action);

        case 'FIND':
            return findReduce(state, action);

        default:
            return state;
    }
}

// レデュースアクション

// メモ追加のレデュース処理
function addReduce(state, action){
    let d = new Date();
    let f = d.getHours() + ':' + d.getMinutes()
        + ':' + d.getSeconds();
    let data = {
        message:action.message,
        created:f
    };
    let newdata = state.data.slice();// 配列の作り直し
    newdata.unshift(data);// 配列の先頭に追加
    return {
        data:newdata,
        message:'Added!',
        mode:'default',
        fdata:[]
    };
}

// メモ検索のレデュース処理
function findReduce(state, action){
    let f = action.find;
    let fdata = [];
    state.data.forEach((value)=>{
        if (value.message.indexOf(f) >= 0){
            fdata.push(value);
        }
    });
    return {
        data:state.data,
        message:'find "' + f + '":',
        mode:'find',
        fdata:fdata
    };
}

// メモ削除のレデュース処理
function deleteReduce(state, action) {
    let newdata = state.data.slice();
    newdata.splice(action.index, 1);
    return {
        data:newdata,
        message:'delete "' + action.index + '":',
        mode:'delete',
        fdata:[]
    }
}

// アクションクリエイター

// メモ追加のアクション
export function addMemo(text) {
    return {
        type: 'ADD',
        message:text
    }
}

// メモ削除のアクション
export function deleteMemo(num) {
    return {
        type: 'DELETE',
        index:num
    }
}

// メモ検索のアクション
export function findMemo(text) {
    return {
        type: 'FIND',
        find:text
    }
}

// ストアを作成
export default createStore(memoReducer);