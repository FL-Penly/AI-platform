<template>
    <div style="width: 100%;display: flex;flex-direction: column;align-items: center;position: relative">
        <h2 style="width: 1000px;color: #854050;font-size:27px">平台简介</h2>
        <div style="width: 1000px;font-size: 19px">
            &nbsp&nbsp体验计算机视觉的四大经典任务的建模与训练过程，包括图像分类、目标检测、语义分割和图像生成。图像分类是指将图像分类为预定义的类别，
            目标检测是指在图像中检测出特定的物体并标注它们的位置，语义分割是指将图像分割成不同的区域，并为每个区域分配一个语义标签，图像生成则是指利用计算机生成技术生成逼真的图像。
            <br>
            &nbsp&nbsp平台不仅能体验整个训练过程，还可以自主建立标注数据集，使用该平台来训练自己的计算机视觉模型，利用自己的数据集进行训练，以满足自己的特定需求。
            平台还提供了一系列工具和资源，方便进行数据标注、模型训练和性能评估，并提供与之相配套的课程。
        </div>
        <h2 style="width: 1000px;color: #854050;font-size:27px">经典视觉任务</h2>
        <h2 style="width: 1000px;font-size:20px">点击下方图片即可体验相应任务</h2>

        <el-row style="width: 1000px;display: flex;text-align: center;margin-top: 30px;font-size: 19px">
            <el-col :span="6" style="flex: 1">
                <span>图像分类</span>
            </el-col>
            <el-col :span="6" style="flex: 1">
                <span>目标检测</span>
            </el-col>
            <el-col :span="6" style="flex: 1">
                <span>语义分割</span>
            </el-col>
            <el-col :span="6" style="flex: 1">
                <span>图像生成</span>
            </el-col>
        </el-row>
        <el-row style="width: 1000px;display: flex;text-align: center;margin-top: 10px">
            <el-col :span="6" style="flex: 1">
                <router-link to="/classify" tag="div">
                    <el-image src="./src/assets/image/classification.png" style="width: 190px;height: 230px"></el-image>
                </router-link>
            </el-col>
            <el-col :span="6" style="flex: 1;">
                <router-link to="/detect" tag="div">
                    <el-image src="./src/assets/image/objectDetection.png"
                              style="width: 190px;height: 230px"></el-image>
                </router-link>
            </el-col>
            <el-col :span="6" style="flex: 1">
                <router-link to="/segment" tag="div">
                    <el-image src="./src/assets/image/instanceSegmentation.png"
                              style="width: 190px;height: 230px"></el-image>
                </router-link>
            </el-col>
            <el-col :span="6" style="flex: 1">
                <el-image src="./src/assets/image/generation.png" style="width: 190px;height: 230px"></el-image>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
</script>

<style scoped>

</style>